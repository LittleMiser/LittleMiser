//
//  UserModel.h
//  FeedsAPP
//
//  Created by student on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#ifndef UserModel_h
#define UserModel_h
#import <UIKit/UIKit.h>

@interface UserModel : NSObject

//用户名
@property (nonatomic,copy) NSString *username;
//介绍
@property (nonatomic,copy) NSString *introduction;
//头像图片路径
@property (nonatomic,copy) NSString *imagePath;

@end
#endif /* UserModel_h */
